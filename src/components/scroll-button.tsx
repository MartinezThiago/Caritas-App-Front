
function ScrollButton({ targetId, label ,disabledFlag}:{targetId:string,label:string,disabledFlag:boolean}) {
    const handleClick = () => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <button
            onClick={handleClick}
            className="h-[2.5rem] px-6 w-[250px] outline-transparent outline disabled:bg-gray-500 disabled:hover:text-white disabled:hover:outline-none disabled:hover:bg-gray-600 bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200 text-white active:text-white active:bg-rose-700"
            disabled={disabledFlag}
        >
            {label}
        </button>
    );
}

export default ScrollButton;