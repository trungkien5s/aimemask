import { useCallback } from "react";
import { Upload, File, X } from "lucide-react";
import {useTranslation} from "react-i18next";

const FileUpload = ({ uploadedFile, setUploadedFile, isAuthenticated, language }) => {
    const acceptedFormats = [".txt", ".pdf", ".xlsx", ".docx", ".pptx"];
    const { t } = useTranslation();
    const handleDrop = useCallback(
        (e) => {
            e.preventDefault();
            if (!isAuthenticated) {
                alert(language === "ja" ? "ログインが必要です。" : "You must be logged in.");
                return;
            }

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                setUploadedFile(files[0]);
            }
        },
        [setUploadedFile, isAuthenticated, language]
    );

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
    }, []);

    const handleFileSelect = (e) => {
        if (!isAuthenticated) {
            alert(t("You must be logged in."));
            return;
        }

        const file = e.target.files[0];
        if (file) {
            setUploadedFile(file);
        }
    };


    const removeFile = () => {
        setUploadedFile(null);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Upload className="w-6 h-6 mr-3 text-blue-600" />
                {t("File Upload")}
            </h2>

            {!uploadedFile ? (
                <div
                    className="border-2 border-dashed border-blue-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer bg-blue-50/50"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => document.getElementById("file-input").click()}
                >
                    <Upload className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                    <p className="text-lg text-gray-700 mb-2">
                        {t("Drag and drop your file here, or click to browse")}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                        {t("Supported formats")}: {acceptedFormats.join(", ")}
                    </p>
                    <input
                        id="file-input"
                        type="file"
                        className="hidden"
                        accept={acceptedFormats.join(",")}
                        onChange={handleFileSelect}
                    />
                </div>
            ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <File className="w-8 h-8 text-green-600 mr-3" />
                            <div>
                                <p className="font-medium text-green-800">{uploadedFile.name}</p>
                                <p className="text-sm text-green-600">
                                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={removeFile}
                            className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
