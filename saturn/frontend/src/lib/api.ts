export class STNApiClient {
  /**
   *  API client for Saturn Admin backend.
   * @param baseUrl: string
   */
  registeredUrl: string = "registered/";

  constructor(public baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get(url: string) {
    let GETUrl = `${this.baseUrl}${url}`;
    try {
      return fetch(GETUrl)
        .then((response) => response.json())
        .then((response) => {
          return response;
        });
    } catch (error) {
      return error;
    }
  }

  getRegistered() {
    return this.get("registered/");
  }
}
