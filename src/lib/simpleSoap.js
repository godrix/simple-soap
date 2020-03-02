export default class Soap{

  constructor(url, options={method:'POST', headers:{ 'Content-Type': 'application/soap+xml; charset=utf-8' }}){
    this.host = url;
    this.options = options;
    this.header = '<?xml version="1.0" encoding="utf-8"?><soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"><soap12:Body>';
    this.footer = '</soap12:Body></soap12:Envelope>';
  }

  async json(endpoint, envelopeContent){

   try {
    const response = await fetch(`${this.host}/${endpoint}`, {
      method: this.options.method,
      headers: this.options.headers,
      body: `${this.header}${envelopeContent}${this.footer}`
    }).then(response => response.text()).then(r=>{return r});

    return this.JSONParse(response);

   } catch (error) {
    return {error:error}
   }
  }

  async text(endpoint, envelopeContent){
    try {
      const response = await fetch(`${this.host}/${endpoint}`, {
        method: this.options.method,
        headers: this.options.headers,
        body: `${this.header}${envelopeContent}${this.footer}`
      }).then(response => response.text()).then(r=>{return r});

      return response;

     } catch (error) {
      return error
     }
  }

  JSONParse(content){
    return JSON.parse(content.replace(/[<][^>]*[>]/g, ""));
  }

}
