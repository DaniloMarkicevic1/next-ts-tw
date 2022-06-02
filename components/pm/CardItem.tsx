interface CardItemInterface {
    text: string;
    label: string;
}

const CardItem: React.FC<CardItemInterface> = ({ text, label }) => {
    return (
        <p className="grid justify-center text-center">
            <span className="text-gray-800">{label}</span>
            {text || 'N/A'}
        </p>
    );
};

export default CardItem;
