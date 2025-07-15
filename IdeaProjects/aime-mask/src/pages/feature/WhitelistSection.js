    import { FileText, Upload } from "lucide-react"
    import {useTranslation} from "react-i18next";

    const WhitelistSection = ({ whitelistFile, setWhitelistFile, isAuthenticated, language }) => {
        const { t } = useTranslation();
        const handleFileSelect = (e) => {
            if (!isAuthenticated) {
                alert(t("You must be logged in."));
                return;
            }

            const file = e.target.files[0];
            if (file) {
                setWhitelistFile(file);
            }
        };

        return (
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    {t("Whitelist Configuration")}
                </h3>

                <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                        {t("Upload a whitelist file (.txt) to specify terms that should not be masked")}
                    </p>

                    <div className="relative">
                        <input
                            type="file"
                            accept=".txt"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="whitelist-input"
                        />
                        <label
                            htmlFor="whitelist-input"
                            className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                        >
                            <Upload className="w-5 h-5 text-gray-400 mr-2" />
                            <span className="text-gray-600">
                                {whitelistFile ? whitelistFile.name : t("Choose whitelist file")}
                            </span>
                        </label>
                    </div>

                    {whitelistFile && (
                        <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                            ✓ {t("Whitelist file loaded")}: {whitelistFile.name}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    export default WhitelistSection;
