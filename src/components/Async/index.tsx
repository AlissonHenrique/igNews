import { useEffect, useState } from "react";

export function Async() {
    const [isButtonVisible, setIsButtonVisibleis] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setIsButtonVisibleis(true);
        }, 1000);
    }, []);
    return (
        <div>
            <div>Hello World</div>
            {isButtonVisible && <button>Button</button>}
        </div>
    );
}
