
import { useState, useCallback } from "react"
import Header from "../../components/layout/userLayout/Header";
import Footer from "../../components/layout/userLayout/Footer";
import {useAuth} from "../../components/contexts/AuthContext";
import FileUpload from "../feature/FileUpload";
import EntitiesSection from "../feature/EntitiesSection";
import WhitelistSection from "../feature/WhitelistSection";
import ActionSection from "../feature/ActionSection";
import {useTranslation} from "react-i18next";



const FeaturePage = ({ onProcess, className = "" }) => {
    const [language, setLanguage] = useState("en")
    const [dragActive, setDragActive] = useState(false)
    const [debug, setDebug] = useState(false)
    const [entitySettings, setEntitySettings] = useState({})
    const { isAuthenticated, user } = useAuth();


    const { t } = useTranslation();

    const [uploadedFile, setUploadedFile] = useState(null)
    const [whitelistFile, setWhitelistFile] = useState(null)
    const [debugMode, setDebugMode] = useState(false)
    const [entities, setEntities] = useState({
        location: { maskType: "mask-all", substitute: "" },
        email: { maskType: "mask-all", substitute: "" },
        age: { maskType: "mask-all", substitute: "" },
        money: { maskType: "mask-all", substitute: "" },
        phone: { maskType: "mask-all", substitute: "" },
        time: { maskType: "mask-all", substitute: "" },
        facility: { maskType: "mask-all", substitute: "" },
        address: { maskType: "mask-all", substitute: "" },
        postalAddress: { maskType: "mask-all", substitute: "" },
        creditCard: { maskType: "mask-all", substitute: "" },
        url: { maskType: "mask-all", substitute: "" },
        organization: { maskType: "mask-all", substitute: "" },
        person: { maskType: "mask-all", substitute: "" },
    })

    const handleEntityChange = (entityKey, field, value) => {
        setEntities((prev) => ({
            ...prev,
            [entityKey]: {
                ...prev[entityKey],
                [field]: value,
            },
        }))
    }

    // const handleMasking = () => {
    //     console.log("Processing masking with:", {
    //         file: uploadedFile,
    //         whitelist: whitelistFile,
    //         entities,
    //         debug: debugMode,
    //     })
    //     // Implement masking logic here
    // }

    const handleDrag = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }, [])

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (!isAuthenticated) {
            alert(language === "ja" ? "ログインが必要です。" : "You must be logged in.");
            return;
        }

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setUploadedFile(e.dataTransfer.files[0]);
        }
    }, [isAuthenticated, language]);



    const handleFileChange = (e) => {
        if (!isAuthenticated) {
            alert(language === "ja" ? "ログインが必要です。" : "You must be logged in.");
            return;
        }

        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0]);
        }
    };



    const handleWhitelistFileChange = (e) => {
        if (!isAuthenticated) {
            alert(language === "ja" ? "ログインが必要です。" : "You must be logged in.");
            return;
        }

        if (e.target.files && e.target.files[0]) {
            setWhitelistFile(e.target.files[0]);
        }
    };

    const updateEntitySetting = (entity, field, value) => {
        setEntitySettings((prev) => ({
            ...prev,
            [entity]: {
                ...prev[entity],
                [field]: value,
            },
        }))
    }

    const handleMasking = () => {
        if (!uploadedFile) {
            alert(language === "ja" ? "ファイルを選択してください。" : "Please select a file.");
            return;
        }

        const data = {
            file: uploadedFile,
            whitelist: whitelistFile,
            entities: entitySettings,
            debug,
        }

        if (onProcess) {
            onProcess(data)
        } else {
            console.log("Processing masking with:", data)
        }
    }


    return (
        <>
        <Header/>
            <div className="space-y-8">
                <FileUpload
                    uploadedFile={uploadedFile}
                    setUploadedFile={setUploadedFile}
                    isAuthenticated={isAuthenticated}
                    language={language}
                />
                <EntitiesSection
                    entities={entities}
                    onEntityChange={handleEntityChange}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <WhitelistSection
                        whitelistFile={whitelistFile}
                        setWhitelistFile={setWhitelistFile}
                        isAuthenticated={isAuthenticated}
                        language={language}
                    />

                    <ActionSection
                        debugMode={debugMode}
                        setDebugMode={setDebugMode}
                        onMasking={handleMasking}
                        disabled={!uploadedFile}
                    />
                </div>
            </div>
    <Footer/>
        </>
    )
}

export default FeaturePage;
