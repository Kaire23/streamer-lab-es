

const SiteFooter: React.FC = () => {
  return (
    <footer className="border-t border-border/60">
      <div className="container mx-auto px-4 py-8 grid gap-6 md:grid-cols-3">
        <div>
          <p className="font-medium">Setups de Streamers</p>
          <p className="text-sm text-muted-foreground mt-2">Guías semanales de equipos de streaming en español.</p>
        </div>
        <div>
          <p className="font-medium">Aviso de Afiliados</p>
          <p className="text-sm text-muted-foreground mt-2">
            Algunos enlaces son de afiliado. Podríamos recibir una comisión sin coste adicional para ti.
          </p>
        </div>
        <div className="text-sm text-muted-foreground md:text-right">
          © {new Date().getFullYear()} Setups de Streamers. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
