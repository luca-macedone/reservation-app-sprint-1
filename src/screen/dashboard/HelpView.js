import React from "react";
import { helpContacts } from "../../data/helpContacts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faqData } from "../../data/faqData";

const HelpView = () => {
  const contacts = helpContacts;
  const faq = faqData;
  return (
    <section className="h-full grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-5 pt-5 pb-10 lg:pb-0">
      <article className="bg-tertiary rounded-xl p-5 h-full  flex flex-col overflow-hidden">
        <div className="flex justify-end">
          <h4 className="font-special text-secondary text-3xl">FAQ</h4>
        </div>

        <ul className="flex flex-col gap-3 h-full pe-3 overflow-y-auto mt-5">
          {faq.map((question, index) => {
            return (
              <li
                key={index}
                className="bg-light p-5 h-full w-full flex flex-col gap-2 rounded-xl"
              >
                <h6 className="font-special font-extralight text-xl text-accent underline underline-offset-4 decoration-secondary">
                  {question.question}
                </h6>
                <small>{question.answer}</small>
              </li>
            );
          })}
        </ul>
      </article>
      <article className="bg-tertiary rounded-xl p-5 h-full flex flex-col">
        <div className="flex justify-end">
          <h4 className="font-special text-secondary text-3xl">Get in touch</h4>
        </div>
        <div className="h-full pt-5">
          <ul className="grid grid-flow-row grid-cols-2 gap-5 h-full">
            {contacts.map((contact, index) => {
              return (
                <li
                  key={index}
                  className="bg-light p-5 h-full w-full flex flex-col justify-between gap-3 rounded-xl"
                >
                  <div className="flex flex-col gap-3">
                    <h6 className="font-special font-extralight text-xl text-accent underline underline-offset-4 decoration-secondary">
                      {contact.section}
                    </h6>
                    <small>{contact.description}</small>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faEnvelope} />
                      <a
                        href={`mailto:${contact.email}`}
                        aria-label={contact.email}
                      >
                        {contact.email}
                      </a>
                    </div>
                    {contact.phone !== "Not available" && (
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faPhone} />
                        <a
                          href={`tel:${contact.phone}`}
                          aria-label={contact.phone}
                        >
                          {contact.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </article>
    </section>
  );
};

export default HelpView;
