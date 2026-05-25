/* CateonCook redesign — design canvas + tweaks */

const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#1BA8E0",
  "showAnnotations": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    document.documentElement.style.setProperty("--show-annot", t.showAnnotations ? "1" : "0");
  }, [t.showAnnotations]);

  return (
    <>
      <style>{`
        [data-annot] { opacity: var(--show-annot, 1); transition: opacity .2s; }
      `}</style>

      <DesignCanvas
        title="CateonCook · redesign de la página de inicio"
        subtitle="4 direcciones · brand real (navy + sky + cormorant italic) · copy real del repo"
      >
        <DCSection id="dir" title="Direcciones">
          <DCArtboard id="A" label="A · Editorial Serif" width={1280} height={1000}>
            <DirEditorial />
          </DCArtboard>
          <DCArtboard id="B" label="B · Conversión / SaaS" width={1280} height={1000}>
            <DirConversion />
          </DCArtboard>
          <DCArtboard id="C" label="C · Cinemático / Capítulos" width={1280} height={1000}>
            <DirCinematic />
          </DCArtboard>
          <DCArtboard id="D" label="D · Local / Documental" width={1280} height={1000}>
            <DirLocal />
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Estilo">
          <TweakColor
            label="Acento (sky)"
            value={t.accent}
            onChange={(v) => setTweak("accent", v)}
            options={["#1BA8E0", "#1454A8", "#C9A85B", "#0D2158"]}
          />
          <TweakToggle
            label="Mostrar anotaciones"
            value={t.showAnnotations}
            onChange={(v) => setTweak("showAnnotations", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
