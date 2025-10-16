import {
  isRouteErrorResponse,
  Links,
  Outlet,
  Scripts,
  useSubmit,
  useActionData,
  useLoaderData,
  useMatches,
  useNavigate,
} from "react-router";

import type { Route } from "./+types/root";
import appStylesHref from "./app.scss?url";

// descomentar cuando se generen las variables de dimensiones
// import desktopVariablesHref from './build/desktop/variables.css?url';
// import mobileVariablesHref from './build/mobile/variables.css?url';
// import globalVariablesHref from './build/global/variables.css?url';

// borrar cuando se generen las variables de dimensiones
const desktopVariablesHref = '';
const mobileVariablesHref = '';
const globalVariablesHref = '';

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap",
  },
];

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const theme = formData.get('theme');

  return { theme: theme as string };
};

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  let texts = null;

  texts = await import('./texts.json');

  // descomentar cuando se generen los copies
  // if (url.pathname === '/en') {
  //   texts = await import('./build/en/texts.json');
  // } else {
  //   texts = await import('./build/es/texts.json');
  // }

  return { texts };
}

export function Layout({ actionData = { theme: 'light ' } }: Route.ComponentProps) {
  const data = useActionData();
  const loaderData = useLoaderData();
  const submit = useSubmit();
  const handleChangeTheme = () => {
    if (data?.theme === 'dark') {
      return submit({ theme: 'light' }, { method: 'post', action: '/' });
    }

    return submit({ theme: 'dark' }, { method: 'post' });
  }

  const matches = useMatches();
  const navigate = useNavigate();

  const changeLang = () => {
    const isEnglish = matches.find(m => m.id === 'routes/home');

    if (isEnglish) {
      return navigate('/');

    }
    return navigate('/en');

  };

  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href={globalVariablesHref} />
        <link rel="stylesheet" href={desktopVariablesHref} media="only screen and (min-width:769px)" />
        <link rel="stylesheet" href={mobileVariablesHref} media="only screen and (max-width:768px)" />
        <link rel="stylesheet" href={appStylesHref} />
        <Links />
        <title>Design Tokens </title>
      </head>
      <body className={!data ? actionData.theme : data.theme}>
        <nav className="navbar dst-navbar">
          <div className="container">
            <div onClick={handleChangeTheme} className="navbar__logo">
            </div>
          </div>
        </nav>
        <Outlet context={[loaderData.texts]} />
        <footer>
          <div className="footer">
            <div className="columns">
              <div className="column is-two-thirds">
                <div onClick={handleChangeTheme} className="logo"></div>
              </div>
              <div className="links column is-flex">
                <a href="mailto:hola@designtokens.es">{loaderData.texts.footer.link.mail}</a>
                <a href="https://www.linkedin.com/company/designtokens-es/">{loaderData.texts.footer.link.linkedin}</a>
                <a href="https://designtokenses.substack.com">{loaderData.texts.footer.link.substack}</a>
              </div>
            </div>

            <div className="columns">
              <div className="copyright column is-half">
                {loaderData.texts.footer.copyright} <span><a href="https://docs.google.com/document/d/e/2PACX-1vSdRj2pGU_K0G4d3W8ADa03dFtHrD106py8EjR9-HJGM3GTevYioOPoSxuLTbVR6DHkvpbFnM0neWq9/pub">{loaderData.texts.footer.link.privacy}</a></span>
              </div>
              <div className="column is-flex lang">
                <button onClick={changeLang} className="lang-selector">
                  {matches.find(m => m.id === 'routes/home') ? <span className="flag es" /> : <span className="flag en" />}
                  <span>{loaderData.texts.footer.language}</span>
                </button>
              </div>
            </div>
          </div>
        </footer>
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
