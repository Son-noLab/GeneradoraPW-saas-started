'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface Profile {
  displayName: string | null
  avatarUrl:   string | null
  level:       string       // junior | senior | director
  joinDate:    string | null // ISO string
  phone:       string | null
  city:        string | null
}

interface ProfileContextValue {
  profile: Profile
  updateProfile: (patch: Partial<Profile>) => void
}

const ProfileContext = createContext<ProfileContextValue | null>(null)

export function ProfileProvider({
  children,
  initial,
}: {
  children: ReactNode
  initial: Profile
}) {
  const [profile, setProfile] = useState<Profile>(initial)

  // Carga client-side al montar — garantiza datos frescos independiente del caché del servidor
  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()
      if (!error && data) {
        setProfile({
          displayName: data.display_name  ?? null,
          avatarUrl:   data.avatar_url    ?? null,
          level:       data.level         ?? 'junior',
          joinDate:    data.join_date      ?? null,
          phone:       data.phone         ?? null,
          city:        data.city          ?? null,
        })
      }
    }
    load()
  }, [])

  function updateProfile(patch: Partial<Profile>) {
    setProfile(prev => ({ ...prev, ...patch }))
  }

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfile debe usarse dentro de ProfileProvider')
  return ctx
}

/** Calcula meses en la red desde join_date */
export function monthsInNetwork(joinDate: string | null): number {
  if (!joinDate) return 0
  const ms = Date.now() - new Date(joinDate).getTime()
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24 * 30.44)))
}

export const LEVEL_LABELS: Record<string, string> = {
  junior:   'Junior',
  senior:   'Senior',
  director: 'Director',
}

export const LEVEL_COLORS: Record<string, string> = {
  junior:   'status--progreso',
  senior:   'status--completado',
  director: 'status--camino',
}
