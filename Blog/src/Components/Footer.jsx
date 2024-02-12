import {
  Footer,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";
export default function FooterComponent() {
  return (
    <>
      <Footer className="border border-t-8 border-teal-500">
        <div className="w-full max-w-7xl mx-auto ">
          <div className="grid w-full justify-between sm:flex md:grid-cols-1">
            <div className="m-5">
              <Link
                to="/"
                className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
              >
                <span className="px-4 py-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                  {" "}
                  Parag's
                </span>
                Blog
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-8 m-4 sm:grid-cols-3 sm:gap-6">
              {/*-------- col for about-------- */}
              <div>
                <Footer.Title title="About" className="" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">Blog Project</Footer.Link>
                  <Footer.Link href="/about">Parag's Blog</Footer.Link>
                </Footer.LinkGroup>
              </div>
              {/*-------- col for follow me-------- */}
              <div>
                <Footer.Title title="Follow Me" className="" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="https://github.com/paragsince-01"
                    target="blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </Footer.Link>

                  <Footer.Link
                    href="https://www.linkedin.com/in/parag-aggarwal01"
                    target="blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              {/*-------- col for legal-------- */}
              <div>
                <Footer.Title title="Follow Me" className="" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">Privacy Policy</Footer.Link>
                  <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className="w-full sm:flex sm:items-center sm:justify-between px-4 pb-4">
            <Footer.Copyright
              href="#"
              by="Parag's Blog"
              year={new Date().getFullYear()}
            />
            <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
              {" "}
              <Footer.Icon href="#" icon={BsFacebook} />
              <Footer.Icon href="#" icon={BsInstagram} />
              <Footer.Icon href="#" icon={BsTwitter} />
              <Footer.Icon href="#" icon={BsGithub} />
              <Footer.Icon href="#" icon={BsDribbble} />
            </div>
          </div>
        </div>
      </Footer>
    </>
  );
}
