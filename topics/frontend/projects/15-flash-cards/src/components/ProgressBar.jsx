import PropTypes from 'prop-types';
import '../main.css'


export default function ProgressBar({currentIndex, totalCard}) {
    const processPercentage = ((currentIndex + 1) / totalCard) * 100;
    const formattedPercentage = processPercentage.toFixed(0);
    return (
        <>
            {/* container */}
            <div className='w-full h-[32px] p-1 rounded-[8px] flex items-center border-2 border-[#BFBFBF] relative '>
                {/* processPercentageBar */}
                <div className="h-[20px] rounded-[4px] bg-[#BFBFBF]" style={{ width: `${formattedPercentage}%` }}>
                    <div className='h-[20px] max-w-[40px] pl-0.5 flex items-center'>
                        <span>{formattedPercentage}%</span>
                    </div>
                </div>
                <div className='absolute right-[5px]'>
                    {currentIndex + 1} of {totalCard}
                </div>
            </div>
        </>
    )
}
ProgressBar.PropTypes = {
    currentIndex: PropTypes.number.isRequired,
    totalCard: PropTypes.number,
}
