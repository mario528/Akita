const useScroll = () => {
    let lockHandle = null;
    const lock = () => {
        lockHandle = (event) => {
            event.preventDefault();
        }
        document.body.style.overflow = 'hidden';
        document.body.addEventListener('touchmove', lockHandle, { passive: false });
    };

    const unLock = () => {
        document.body.style.overflow = 'auto';
        document.body.removeEventListener("touchmove", lockHandle);
        lockHandle = null;
    };
    return [lock, unLock];
};

export default useScroll;