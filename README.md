<div>
  <a href="http://community.dronesmith.io" target="_blank">
    <img src="https://dl.dropboxusercontent.com/u/348929/slack.jpg" alt="" width="100%">
  </a>
</div>

# Dronesmith Ground Control Station Example

This app shows a basic ground control and drone monitor using Dronesmith API.

## Usage
Click the side bar of the app to bring down the `actions` tab. Click `takeoff` to takeoff and `land` to land. Once the drone is in the air, you can click anyhwere on the map and it will fly to that location.

## Getting Started
1. You'll need [NodeJS](https://nodejs.org/), and a Dronesmith API account.

2. Dronesmith API: Create an account. Navigate to our [API Page](http://api.dronesmith.io) and make an account. You will get an email within a few days with your account and API key.

3. [Create a virtual drone](http://readme.dronesmith.io/reference) on your account. Use the following REST request: `POST api.dronesmith.io/api/drone/<drone-name>`

4. `POST api.dronesmith.io/api/drone/<drone-name>/start` to initialize your drone.

5. Modify `src/dronesmith.json` with your API key, email, and drone name. See the `dronesmith.example.json` if you want to play with something immediately.

6. After you've set up node, run `npm install` followed by `npm run start`

To start the app! Navigate to `http:localhost:3000` in your browser. Note that the app will automatically open in your browser.

## Technologies
* [Dronesmith](http://readme.dronesmith.io/reference)
* [Xapix](http://xapix.io) (soon!!)
* [Leaflet](http://leafletjs.com/)
* [MapQuest](http://open.mapquest.com/)
* [React](https://facebook.github.io/react/)
* [Material Design](https://material.google.com/)

## Thanks
Adapted from https://github.com/clhenrick/React-Leaflet-demo
