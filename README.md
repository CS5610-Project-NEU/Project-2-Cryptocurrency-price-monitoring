# Welcome to [WEB COIN!](http://webcoin.organizedchaos.me)
As the new wave of cryptocurrencies is engulfing people with enthusiasm, the unpredictability of price fluctuation for their investments is an inevitable concern. Our project **Web Coin** helps the users to overcome this concern, providing them with alert features and visual representation of prices in real-time.

Our application WEB COIN is a cryptocurrency monitoring website dedicated towards monitoring the prices of cryptocurrencies such as _Bitcoin, Ethereum, Litecoin and Bitcash_. The application fetches real-time prices of each cryptocurrency via the Coinbase API and displays the data in the form of line charts using Chart JS library.

The price distribution charts displayed to the user span over hourly, daily, weekly and yearly data. Each of our currencies have their own charts displayed on the main page for visitors of the website to view. Users can register for an account using traditional sign-up/sign-in methods and via their Google (gmail) accounts too.

Registered users are provided with a facility of fake cash that they can enter during registration; which they can use to _fake buy/sell_ various cryptocurrencies on our website.

A pie chart shows the cash they are left with and percentages of cryptocurrencies they have bought through our fake buy/sell. Registered users are also provided with the facilities to put price alerts for any change in price for their currencies of their choice, and an email is triggered to them if the threshold is exceeded.
___
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


    **Don't forget to export _SENDGRID_API_KEY_**
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
