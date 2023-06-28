import React from 'react'

export const TargetIndicator = () => {

    const [target, setTarget] = React.useState(15);
    const [current, setCurrent] = React.useState(0);
    const [error, setError] = React.useState(null);
    const [targetColor, setTargetColor] = React.useState('gray');

    let fixCurrentValue = current ? Number(current.toFixed(1)) : 0;

    let infoValue = fixCurrentValue < target ? ("You need $" + (target-fixCurrentValue).toFixed(1) + " more to reach your target.") : "";

    let infoBlockStyle = infoValue ? 'block' : 'hidden';
    let infoImgStyle = infoValue ? 'block' : 'none';

    React.useEffect(() => {
        fetch('https://alex.devel.softservice.org/testapi/')
            .then((res) => res.json())
            .then((res) => {
                setTimeout(() => setCurrent(Number(res.balance_usd)), 1000);
            })
            .catch(error => {
                setError(error);
            })
    }, [])

    React.useEffect(() => {
        if (current) {
            if (fixCurrentValue < target) {
                setTimeout(() => {
                    setCurrent(fixCurrentValue + 0.2);
                }, 2000)
            } else {
                setTargetColor('#00A910');
                setCurrent(target);
            }
        }
    }, [current])

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    }

    return (

        <div className="container">
            <div className="container-header">Target Indicator Demo</div>
            <div className="container-main flex-center">
                <div className="main flex-center">
                    <div className="main-indicator">
                        <div className="indicator-name">Reached:</div>
                        <div className="indicator-scale">
                            <div className="indicator-scale-container scale">
                                <div className="scale-current" style={{width: fixCurrentValue/target * 100 + '%'}}>
                                    <div className="scale-current__arrow"></div>
                                    <div className="scale-current__value">{'$' + fixCurrentValue}</div>
                                </div>
                            </div>
                        </div>
                        <div className="indicator-target" style={{backgroundColor: targetColor}}>
                            <div className="indicator-target__title">Target</div>
                            <div className="indicator-target__count">{'$' + target}</div>
                        </div>
                    </div>
                    <div className="main-prompt">
                        <div className="main-prompt__icon" style={{display: infoImgStyle}}/>
                        <div className="main-prompt__text" style={{display: infoBlockStyle}}>{infoValue}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}