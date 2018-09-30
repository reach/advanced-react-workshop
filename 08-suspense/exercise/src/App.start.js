/*

1. Fill in `Contact` to use `ContactsResource` to fetch the contact, use the
path: `/contacts/${id}` like this:

2. Notice how we transition before the image loads and then the page jumps
around?  We're waiting for the contact data but not the image. Create an
`<Img/>` component and a new `ImgResource` to delay transitioning until
the image is loaded

Remember, `createResource` needs to return a promise

Tips:

```
// you can load images programatically
let image = new Image();
image.src = someUrl
image.onload = () => {}

// You can create promises out of anything, here we'll use
// setTimeout to make a "sleep" promise:
function sleep(ms=1000) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

// combine those two things to create your `ImageResource`
```

3. Finally, render a `Placeholder` (you'll need to import it from react) around
`Img` with a `2000` delayMs, and then artificially delay your ImageResource by
3000ms with setTimeout.  What happens when you click the links now?

*/

import React from "react";
import { cache } from "./lib/cache";
import { createResource } from "simple-cache-provider";
import { Router, Link } from "@reach/router";

let ContactsResource = createResource(async path => {
  let response = await fetch(`https://contacts.now.sh${path}`);
  let json = await response.json();
  return json;
});

function Home() {
  let { contacts } = ContactsResource.read(cache, "/contacts");
  return (
    <div>
      <h1>Contacts</h1>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            <Link to={contact.id}>
              {contact.first} {contact.last}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

let FAKE_DATA = {
  contact: {
    first: "Ryan",
    last: "Florence",
    avatar: "https://placekitten.com/510/510"
  }
};

function Contact({ id }) {
  // don't use FAKE_DATA, use `ContactsResource`
  let { contact } = FAKE_DATA;
  return (
    <div>
      <h1>
        {contact.first} {contact.last}
      </h1>
      <p>
        <img
          alt={`${contact.first} smiling, maybe`}
          height="250"
          src={contact.avatar}
        />
      </p>
      <p>
        <Link to="/">Home</Link>
      </p>
    </div>
  );
}

export default () => (
  <Router>
    <Home path="/" />
    <Contact path=":id" />
  </Router>
);
