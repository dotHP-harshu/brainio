import axios from "axios";
export async function revokeGoogleAccess(token: string) {
  try {
    await axios.post(
      "https://oauth2.googleapis.com/revoke",
      {},
      {
        params: { token },
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      },
    );
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
