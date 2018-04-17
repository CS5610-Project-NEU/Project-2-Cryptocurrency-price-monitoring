# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :coinbase,
  ecto_repos: [Coinbase.Repo]

# Configures the endpoint
config :coinbase, CoinbaseWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "CeZKaCP6YiVy+E9gaQEkIm/UyJWhUrESzTeMLxS4bycE4ewFYqVk8uQM2sLudNsK",
  render_errors: [view: CoinbaseWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Coinbase.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :coinbase, GitHub,
  client_id: System.get_env("GITHUB_CLIENT_ID"),
  client_secret: System.get_env("GITHUB_CLIENT_SECRET"),
  redirect_uri: System.get_env("GITHUB_REDIRECT_URI")

config :coinbase, Google,
  client_id: System.get_env("GOOGLE_CLIENT_ID"),
  client_secret: System.get_env("GOOGLE_CLIENT_SECRET"),
  redirect_uri: System.get_env("GOOGLE_REDIRECT_URI")


# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
