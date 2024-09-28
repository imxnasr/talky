import PusherClient from "pusher-js";

const pusherClient = new PusherClient(window.ENV.PUSHER_APP_KEY, {
  cluster: "eu",
});

export default pusherClient;
