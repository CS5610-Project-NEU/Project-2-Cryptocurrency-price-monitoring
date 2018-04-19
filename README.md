# Deployment Guide
* use `MIX_ENV=prod mix run priv/repo/seeds.exs` for seeding the production system.
* use `export PORT=PORT_NUMBER` to help run `endpoint.ex`

  ## Dependencies to Install
  * `npm install --save jquery bootstrap popper.js react react-dom reactstrap underscore`
  * `npm install --save-dev babel-preset-env bab
el-preset-react sass-brunch`
  * `npm install react-router-dom  react-router`
  * `npm install redux react-redux deep-freeze`
  * `npm install argon --save`
  * `npm install chart.js --save`
  * `npm install react-chartjs-2 chart.js --save`

___
# Coinbase

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
