import React, { Placeholder } from "react";
import { cache } from "./lib/cache";
import { createResource } from "simple-cache-provider";
import { Router, Link } from "@reach/router";

let ContactsResource = createResource(async path => {
  let response = await fetch(`https://contacts.now.sh${path}`);
  let json = await response.json();
  return json;
});

let ImageResource = createResource(src => {
  return new Promise(resolve => {
    let img = new Image();
    img.src = src;
    img.onload = () => {
      setTimeout(() => {
        resolve(src);
      }, 3000);
    };
  });
});

function Img({ src, ...props }) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img src={ImageResource.read(cache, src)} {...props} />;
}

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

function Contact({ id }) {
  let { contact } = ContactsResource.read(cache, `/contacts/${id}`);
  return (
    <div>
      <h1>
        {contact.first} {contact.last}
      </h1>
      <p>
        <Placeholder delayMs={250} fallback={<span>Loading...</span>}>
          <Img
            alt={`${contact.first} smiling, maybe`}
            height="250"
            src={contact.avatar}
          />
        </Placeholder>
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
