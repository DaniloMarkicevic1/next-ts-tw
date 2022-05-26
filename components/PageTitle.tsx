interface Props {
    title: string;
}
const PageTitle: React.FC<Props> = ({ title }) => {
    return (
        <p className="font-bold text-3xl text-gray-800 text-center mb-5">
            {title}
        </p>
    );
};

export default PageTitle;
