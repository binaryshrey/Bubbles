/************************************************************ IMPORTS ************************************************************/

import { BASE_APP_URI, GITHUB_URI, LINKEDIN_URI } from '../utils/Constants';
import { RiGithubFill, RiLinkedinBoxFill, RiEarthFill } from '@remixicon/react';

/************************************************************ IMPORTS ************************************************************/

const navigation = [
  { name: 'LinkedIn', href: LINKEDIN_URI },
  { name: 'Github', href: GITHUB_URI },
  { name: 'Public', href: BASE_APP_URI },
];

const Footer = () => {
  return (
    <footer className="bg-black/[0.96] antialiased bg-grid-white/[0.02] px-4 md:px-6 pb-4">
      <div className="container mx-auto">
        <div className=" border-t border-zinc-600 pt-4 flex items-center justify-between">
          <div className="text-sm font-medium text-zinc-400">&copy; 2024 Bubbles Inc.</div>
          <div>
            <div className="flex items-center gap-4">
              <a href={navigation[0].href} className="text-zinc-600 opacity-70 hover:text-foreground">
                <RiLinkedinBoxFill className="h-5 w-5 text-zinc-400" />
              </a>

              <a href={navigation[1].href} className="text-zinc-600 opacity-70 hover:text-foreground">
                <RiGithubFill className="h-5 w-5 text-zinc-400" />
              </a>

              <a href={navigation[2].href} className="text-zinc-600 opacity-70 hover:text-foreground">
                <RiEarthFill className="h-5 w-5 text-zinc-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
