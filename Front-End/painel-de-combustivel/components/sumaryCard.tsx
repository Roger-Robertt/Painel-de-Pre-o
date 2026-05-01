
interface CardProps {
    title: string;
    value?: number | string;
    icon: React.ReactNode;
}

export const SummaryCard: React.FC<CardProps> = ({ title, value, icon }) => {
    return (
        <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                {icon}
            </div>

            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-lg font-semibold text-gray-900">{value}</p>
            </div>
        </div>
    );
}

export default SummaryCard;