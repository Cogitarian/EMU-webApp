
# EMU-webApp 

The EMU-webApp is an online and offline web application for labeling, visualizing and correcting speech and derived speech data. 

To see it in action visit [this URL](http://ips-lmu.github.io/EMU-webApp/). General information about the next iteration of the EMU speech database management system can be found [here](http://ips-lmu.github.io/EMU.html).


## Quick start

Visit [this URL](http://ips-lmu.github.io/EMU-webApp/) and click `open demo DB` to load a demo database.

## Tools for development

* install [nodejs and npm](http://nodejs.org/)
* install `bower` with `npm install -g bower`
* install `grunt` with `npm install -g grunt`
* clone this repo with `git clone https://github.com/IPS-LMU/EMU-webApp.git`
* install dependencies (in `EMU-webApp` folder) with the command `bower install` and `npm install`
* run static file server at `http://localhost:9000`  with `grunt server`
* for livereload use the `livereload` browser plugin
* a small websocket data provider server can be found under `exampleServers/nodeFormantCorrWSserver.js`

## Authors

**Raphael Winkelmann**

+ [github](http://github.com/raphywink)

**Georg Raess**

+ [github](http://github.com/georgraess)
