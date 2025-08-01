import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

const useFontAwesome = () : void => {
    library.add(fas);
    library.add(far);
    library.add(fab);
};

export default useFontAwesome;