
const Rating = ({ rating, className, size }) => {

    className += 'flex items-center';

    return <div className={className}>
        {
            rating && [...Array(parseInt(rating))].map((_, i) => (
                <i key={'star-fill-' + i} className={`bi bi-star-fill mr-1 text-purple-800 ${size}`}></i>
            ))}
        {
            rating && [...Array(5 - parseInt(rating))].map((_, i) => (
                <i key={'star-blank' + i} className={`bi bi-star mr-1 text-purple-800 ${size}`}></i>
            ))
        }
    </div>;
};

export default Rating;
