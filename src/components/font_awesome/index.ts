import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';

const SOLID = [faUserSecret];
const BRANDS = [faFacebookF, faTwitter, faYoutube];
const REGULAR = [faBell];

library.add(...SOLID, ...BRANDS, ...REGULAR);

export default FontAwesomeIcon;
