import PropTypes from 'prop-types';

export const Content = ({ question, answer, isFlipped}) => {
    return (
        <div className="p-1 border-2 border-[#BFBFBF] my-1 rounded-[8px]">
            {isFlipped ? (
            <div className="bg-[#F5F5F5] min-h-[200px] flex items-center justify-center">
                <p className=" text-center max-w-4/5 text-[1.2rem]">
                {answer}
                </p>
            </div>
            ) : (
            <div className="bg-[#F5F5F5] min-h-[200px] flex items-center justify-center">
                <p className="text-center text-4xl">
                {question}
                </p>
            </div>
            )}
        </div>
    );
};

Content.PropTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    isFlipped: PropTypes.bool.isRequired,
    onFlip: PropTypes.func.isRequired,
};