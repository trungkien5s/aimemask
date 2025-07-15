"use client"
import { Database } from "lucide-react"
import EntityCard from "./EntityCard"
import { MapPin, Mail, Cake, DollarSign, Phone, Clock, Building2, Home, Mailbox, CreditCard, Link, Landmark, User } from "lucide-react";
import {useTranslation} from "react-i18next";

const EntitiesSection = ({ entities, onEntityChange }) => {
    const { t } = useTranslation();

    const entityConfigs = [
        { key: "location", label: t("Location"), icon: <MapPin className="w-5 h-5 text-blue-600" /> },
        { key: "email", label: t("Email"), icon: <Mail className="w-5 h-5 text-blue-600" /> },
        { key: "age", label: t("Age"), icon: <Cake className="w-5 h-5 text-blue-600" /> },
        { key: "money", label: t("Money"), icon: <DollarSign className="w-5 h-5 text-blue-600" /> },
        { key: "phone", label: t("Phone"), icon: <Phone className="w-5 h-5 text-blue-600" /> },
        { key: "time", label: t("Time"), icon: <Clock className="w-5 h-5 text-blue-600" /> },
        { key: "facility", label: t("Facility"), icon: <Building2 className="w-5 h-5 text-blue-600" /> },
        { key: "address", label: t("Address"), icon: <Home className="w-5 h-5 text-blue-600" /> },
        { key: "postalAddress", label: t("Postal Address"), icon: <Mailbox className="w-5 h-5 text-blue-600" /> },
        { key: "creditCard", label: t("Credit Card"), icon: <CreditCard className="w-5 h-5 text-blue-600" /> },
        { key: "url", label: t("URL"), icon: <Link className="w-5 h-5 text-blue-600" /> },
        { key: "organization", label: t("Organization"), icon: <Landmark className="w-5 h-5 text-blue-600" /> },
        { key: "person", label: t("Person"), icon: <User className="w-5 h-5 text-blue-600" /> },
    ];

    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Database className="w-6 h-6 mr-3 text-blue-600" />
                {t("Entity Configuration")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {entityConfigs.map((config) => (
                    <EntityCard
                        key={config.key}
                        config={config}
                        entity={entities[config.key]}
                        onChange={(field, value) => onEntityChange(config.key, field, value)}
                    />
                ))}
            </div>
        </div>
    )
}

export default EntitiesSection
