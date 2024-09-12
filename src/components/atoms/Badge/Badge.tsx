import './badge.css';

type Prop = {
    badgeText: string | number;
    badgePosition: { x: number, y: number };
}

const Badge = ({badgeText, badgePosition}: Prop) => {
    return <div className="badge" style={{top: `${badgePosition.y}px`, right: `${badgePosition.x}px`}}>
        {badgeText}
    </div>
}

export default Badge;