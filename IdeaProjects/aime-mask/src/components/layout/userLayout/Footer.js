import React from 'react';
import FooterLinkGroup from "./FooterLinkGroup";
import { Shield } from "lucide-react";
import {useTranslation} from "react-i18next";

const Footer = () => {
    const {t} = useTranslation();
    const footerLinks = [
        {
            title: t("Product"),
            links: [t("File Encryption"), t("Security API"), t("AI Monitoring")]
        },
        {
            title: t("Company"),
            links: [t("About Us"), t("Careers"), t("Blog")]
        },
        {
            title: t("Support"),
            links: [t("Documentation"), t("Contact"), t("System Status")]
        }
    ];


    return (
        <footer className="bg-blue-900 text-white py-12 px-6">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2">
                            <img src="/logo.png" alt="SecureAI Logo" className="h-10 w-auto" />
                        </div>
                    </div>

                    {footerLinks.map((group, index) => (
                        <div key={index}>
                            <h4 className="text-white font-semibold mb-4">{group.title}</h4>
                            <ul className="space-y-2 text-blue-200">
                                {group.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a href="#" className="hover:text-blue-400 transition-colors">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
                    <p>{t("Copyright © 2018 - 2025 Aimesoft. All rights reserved.")}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
