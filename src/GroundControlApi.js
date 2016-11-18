import dronesmith from '!json!./dronesmith.json';

class GroundControlApi {

  static requestHeaders() {
    return {
      'user-email': dronesmith.email,
      'user-key': dronesmith.key,
      'Content-Type': 'application/json'
    }
  }

  static telemRequest(kind) {
    const headers = this.requestHeaders();
    const request = new Request('http://api.dronesmith.io/api/drone/' + dronesmith.drone + '/' + kind, {
      method: 'GET',
      headers: headers
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }


  static commandRequest(command, data) {
    const headers = this.requestHeaders();
    const request = new Request('http://api.dronesmith.io/api/drone/' + dronesmith.drone + '/' + command, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default GroundControlApi;
