defmodule CoinbaseWeb.AuthController do
  use CoinbaseWeb, :controller

  @doc """
   This action is reached via `/auth/:provider` and redirects to the OAuth2 provider
   based on the chosen strategy.
   """
   def index(conn, %{"provider" => provider}) do
     redirect conn, external: authorize_url!(provider)
   end

   def delete(conn, _params) do
     conn
     |> put_flash(:info, "You have been logged out!")
     |> configure_session(drop: true)
     |> redirect(to: "/")
   end

   @doc """
   This action is reached via `/auth/:provider/callback` is the the callback URL that
   the OAuth2 provider will redirect the user back to with a `code` that will
   be used to request an access token. The access token will then be used to
   access protected resources on behalf of the user.
   """
   def callback(conn, %{"provider" => provider, "code" => code}) do
     client = get_token!(provider, code)

     user = get_user!(provider, client)

     conn
     |> put_session(:current_user, user)
     |> put_session(:access_token, client.token.access_token)
     |> redirect(to: "/")
   end


    defp authorize_url!("github"),   do: GitHub.authorize_url!
   defp authorize_url!("google"),   do: Google.authorize_url!(scope: "https://www.googleapis.com/auth/userinfo.email")
   defp authorize_url!("facebook"), do: Facebook.authorize_url!(scope: "user_photos")
   defp authorize_url!(_), do: raise "No matching provider available"

   defp get_token!("google", code),   do: Google.get_token!(code: code)
   defp get_token!("github", code),   do: GitHub.get_token!(code: code)
   defp get_token!("facebook", code), do: Facebook.get_token!(code: code)
   defp get_token!(_, _), do: raise "No matching provider available"

   defp get_user!("github", client) do
     %{body: user} = OAuth2.Client.get!(client, "/user")
     %{name: user["name"], avatar: user["avatar_url"]}
   end

   defp get_user!("google", client) do
     %{body: user, status_code: status} = OAuth2.Client.get!(client, "https://www.googleapis.com/plus/v1/people/me/openIdConnect")
     %{name: user["name"], domain: user["hd"], email_verified: user["email_verified"], avatar: user["picture"]}
   end

   defp get_user!("facebook", client) do
     %{body: user} = OAuth2.Client.get!(client, "/me", fields: "id,name")
     %{name: user["name"], avatar: "https://graph.facebook.com/#{user["id"]}/picture"}
   end
  end
