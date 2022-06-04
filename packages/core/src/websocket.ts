export const getWebSocketScriptContents = (): string => `
console.log("Creating websocket");
console.log(window.location);
const websocket = new WebSocket("ws://" + window.location.host);
  websocket.addEventListener('message', ({data}) => {
  if(data === window.location.pathname) window.location.reload(true);
});`; 
