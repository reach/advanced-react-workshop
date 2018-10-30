import React, { Suspense } from "react";
import { unstable_createResource as createResource } from "react-cache";
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
  return <img src={ImageResource.read(src)} {...props} />;
}

function Home() {
  let { contacts } = ContactsResource.read("/contacts");
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
  let { contact } = ContactsResource.read(`/contacts/${id}`);
  return (
    <div>
      <h1>
        {contact.first} {contact.last}
      </h1>
      <p>
        <Suspense maxDuration={1000} fallback={<span>Loading...</span>}>
          <Img
            alt={`${contact.first} smiling, maybe`}
            height="250"
            src={contact.avatar}
          />
        </Suspense>
      </p>
      <p>
        <Link to="/">Home</Link>
      </p>
    </div>
  );
}

export default () => (
  <Suspense maxDuration={3000} fallback={<div>Loading...</div>}>
    <Router>
      <Home path="/" />
      <Contact path=":id" />
    </Router>
  </Suspense>
);
