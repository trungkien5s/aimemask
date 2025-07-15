import { Play, Bug } from "lucide-react"
import { useTranslation } from "react-i18next";

const ActionSection = ({ debugMode, setDebugMode, onMasking, disabled }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t('Processing Options')}
            </h3>

            <div className="space-y-6">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="debug-mode"
                        checked={debugMode}
                        onChange={(e) => setDebugMode(e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="debug-mode" className="ml-3 flex items-center text-gray-700">
                        <Bug className="w-4 h-4 mr-2" />
                        {t('Enable Debug Mode')}
                    </label>
                </div>

                <button
                    onClick={onMasking}
                    disabled={disabled}
                    className={`w-full flex items-center justify-center px-6 py-4 rounded-lg font-semibold text-white transition-all ${
                        disabled
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    }`}
                >
                    <Play className="w-5 h-5 mr-2" />
                    {disabled ? t('Upload a file to start') : t('START MASKING')}
                </button>

                {disabled && (
                    <p className="text-sm text-gray-500 text-center">
                        {t('Please upload a file before processing')}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ActionSection;
