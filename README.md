# Overhead Flight Tracker

TLDR: I was bored; I wanted to play around with [RTK2.0](https://redux-toolkit.js.org/), and I am an amateur avGeek :) 

> To any potential interviewers: I scrambled this together in a few hours (after >1yr of career break to study. Wanted to get my hands dirty.) Happy to discuss design/drawbacks/improvements!

It's not exactly an FR clone, I wanted this more for an overhead projection for my room (see [demo](#demo) video), and basically to see the Airline/Src/Dest/Alt without having to individually click on an icon.

Real-time flight data from [OpenSky API](https://openskynetwork.github.io/opensky-api/rest.html) and [ADSBD API](https://www.adsbdb.com/)

## Main Takeaways

- React best practices for map rendering
- Interpolate flight position for smooth(er) animation rendering, given heading and velocity
- Flights might operate without a callsign (?!!)

## Demo

https://github.com/user-attachments/assets/7d116f95-1709-47d8-9a09-e62a5a306393

[Screen capture](https://drive.google.com/file/d/1NR0wAgASuNN3XoN8vVGygQv0sT87CSKU/view?usp=sharing)


<!-- <video controls src="./app/assets/2F37008F-9798-4517-AE9B-371C7FD68371.MP4" title="Title"></video>

<video controls src="./app/assets/Screen Recording 2025-12-31 at 23.17.50.mov" title="Title"></video> -->


## DIY Development

- Plug in your geo co-ordinates in constants file
- Get a google API key with Map APIs enabled and plug it in a .env file

```
├── package.json
├── .env (<------ CREATE!!)
├── app/
│   ├── utils/ 
|   |   |── constants.js (<------ GEO COORDINATES HERE)
│   └── 
```
Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
