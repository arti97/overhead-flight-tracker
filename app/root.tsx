import {
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { Provider, useDispatch } from 'react-redux'
import store from "./redux/store.ts"
import "./app.css";

export default function App() {

  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
        </head>
        <body>
          <Outlet />

          <ScrollRestoration />

          <Scripts />
        </body>
      </html>
    </Provider>
  );
}
