import { useState, useEffect, useRef } from 'react'

export const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//check if the element is partially scrolled into view.
export const useOnScreen = (el) => {
    let isOnScreen
    if(!el) return true
    const rect = el.getBoundingClientRect()
    const elemTop = rect.top
    const elemBottom = rect.bottom
    isOnScreen = (elemTop >= 0) && (elemBottom <= window.innerHeight)
    return isOnScreen;
}

// Find position on the window after scrolling
export const useScroll = () => {
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [bodyOffset, setBodyOffset] = useState(document.body.getBoundingClientRect());
    const [scrollY, setScrollY] = useState(bodyOffset.top);
    const [scrollDirection, setScrollDirection] = useState();
      
    const listener = e => {
        setBodyOffset(document.body.getBoundingClientRect());
        setScrollY(-bodyOffset.top);
        setScrollDirection(lastScrollTop > -bodyOffset.top ? "down" : "up");
        setLastScrollTop(-bodyOffset.top)
    };
      
    useEffect(() => {
          window.addEventListener("scroll", listener);
          return () => {
            window.removeEventListener("scroll", listener);
          };
    });
      
    return {
        scrollY,
        scrollDirection
    }
}

// Determine screen orientation
export const useScreenOrientation = () => {
    const [orientation, setOrientation] = useState('')
    const setScreenOrientation = () => {
        if (window.matchMedia("(orientation: portrait)").matches) {
          setOrientation('portrait');
        }
    
        if (window.matchMedia("(orientation: landscape)").matches) {
          setOrientation('landscape');
        }
    }
  
    useEffect(() => {
        window.addEventListener("resize", setScreenOrientation);
        return () => {
          window.removeEventListener("resize", setScreenOrientation);
        };
    }, []);
  
    return { orientation }
     
}

// Determine window size
export const useWindowSize = () => {
    const initialWidth = window.innerWidth
    const initialHeight = window.innerHeight
    const [windowWidth, setWindowWidth] = useState(initialWidth)
    const [windowHeight, setWindowHeight] = useState(initialHeight)
  
    const handleResize = () => {
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    }
  
    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize);
          };
    }, [])
  
    return { windowWidth, windowHeight }
}

// Key board listener
export const useKeyboardEvent = (key, callback) => {
    useEffect(() => {
        const handler = function(event) {
          if(typeof key === "string"){
            if (event.key === key) {
              event.preventDefault()
              callback()
            }
          } else {
            if(key.lettersOnly){
              if(event.keyCode >= 65 && event.keyCode <= 90){
                event.preventDefault()
                callback(event)
              }
            }
          }
         }
  
         window.addEventListener('keydown', handler)
         return () => {
            window.removeEventListener('keydown', handler)
        }
    }, [key, callback])
}

export const useOnClickOutside = (ref, handler) => {
    useEffect(
      () => {
        const listener = event => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
  
          handler(event);
        };
  
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
  
        return () => {
          document.removeEventListener('mousedown', listener);
          document.removeEventListener('touchstart', listener);
        };
      },
      [ref, handler]
    );
}

export  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }