// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
    en: {
        translation: {
            // Sign In Page
            'Sign In': 'Sign In',
            'Username': 'Username',
            'Password': 'Password',
            'Remember me': 'Remember me',
            'Forgot password?': 'Forgot password?',
            'Signing in...': 'Signing in...',
            'Enter your username': 'Enter your username',
            'Enter your password': 'Enter your password',
            'Username or email is required': 'Username or email is required',
            'Password is required': 'Password is required',
            'Invalid login credentials.': 'Invalid login credentials.',
            'Unable to connect to server. Please try again.': 'Unable to connect to server. Please try again.',

            // Auth Layout
            'Welcome to AimeMask': 'Welcome to AimeMask',
            'Home': 'Home',
            'Product': 'Product',
            'Service': 'Service',
            'Contact': 'Contact',
            'Help': 'Help',
            'About Us': 'About Us',

            // Inside en.translation
            'Processing Options': 'Processing Options',
            'Enable Debug Mode': 'Enable Debug Mode',
            'START MASKING': 'START MASKING',
            'Upload a file to start': 'Upload a file to start',
            'Please upload a file before processing': 'Please upload a file before processing',
            // Common
            'An error occurred.': 'An error occurred.',
            'Loading...': 'Loading...',


            // Entity labels
            'Location': 'Location',
            'Email': 'Email',
            'Age': 'Age',
            'Money': 'Money',
            'Phone': 'Phone',
            'Time': 'Time',
            'Facility': 'Facility',
            'Address': 'Address',
            'Postal Address': 'Postal Address',
            'Credit Card': 'Credit Card',
            'URL': 'URL',
            'Organization': 'Organization',
            'Person': 'Person',
            'Entity Configuration': 'Entity Configuration',


// EntityCard
            'Masking Type': 'Masking Type',
            'Substitute Character': 'Substitute Character',
            'Enter substitute': 'Enter substitute',
            'Mask all characters': 'Mask all characters',
            'Mask partially': 'Mask partially',
            'No masking': 'No masking',

// FileUpload & Whitelist
            'File Upload': 'File Upload',
            'Drag and drop your file here, or click to browse': 'Drag and drop your file here, or click to browse',
            'Supported formats': 'Supported formats',
            'You must be logged in.': 'You must be logged in.',
            'Whitelist Configuration': 'Whitelist Configuration',
            'Upload a whitelist file (.txt) to specify terms that should not be masked': 'Upload a whitelist file (.txt) to specify terms that should not be masked',
            'Choose whitelist file': 'Choose whitelist file',
            'Whitelist file loaded': 'Whitelist file loaded',

            // Header & Footer
            "Log out": "Log out",
            "Profile": "Profile",
            "Settings": "Settings",
            "Premium Member": "Premium Member",
            "Logout successful!": "Logout successful!",
            "You have been logged out successfully!": "You have been logged out successfully!",
            "An error occurred during logout. Please try again.": "An error occurred during logout. Please try again.",

            "File Encryption": "File Encryption",
            "Security API": "Security API",
            "AI Monitoring": "AI Monitoring",

            "Company": "Company",
            "Careers": "Careers",
            "Blog": "Blog",

            "Support": "Support",
            "Documentation": "Documentation",
            "System Status": "System Status",

            "Copyright © 2018 - 2025 Aimesoft. All rights reserved.": "Copyright © 2018 - 2025 Aimesoft. All rights reserved.",



            // Sign Up Page
            'Sign Up': 'Sign Up',
            'Create Account': 'Create Account',
            'Confirm Password': 'Confirm Password',
            'Re-enter your password': 'Re-enter your password',
            'Registering...': 'Registering...',
            'I agree to the': 'I agree to the',
            'Terms of Service': 'Terms of Service',
            'Privacy Policy': 'Privacy Policy',
            'Please agree to the terms of service': 'Please agree to the terms of service',
            'Already have an account?': 'Already have an account?',
            'Sign in now': 'Sign in now',

        }
        },
        ja: {
            translation: {
                // Sign In Page
                'Sign In': 'ログイン',
                'Username': 'ユーザー名',
                'Password': 'パスワード',
                'Remember me': 'ログイン状態を保持',
                'Forgot password?': 'パスワードを忘れましたか？',
                'Signing in...': 'ログイン中...',
                'Enter your username': 'ユーザー名を入力してください',
                'Enter your password': 'パスワードを入力してください',
                'Username or email is required': 'ユーザー名またはメールアドレスが必要です',
                'Password is required': 'パスワードが必要です',
                'Invalid login credentials.': 'ログイン情報が正しくありません。',
                'Unable to connect to server. Please try again.': 'サーバーに接続できません。再度お試しください。',

                // Auth Layout
                'Welcome to AimeMask': 'AimeMaskへようこそ',
                'Home': 'ホーム',
                'Product': '製品',
                'Service': 'サービス',
                'Contact': 'お問い合わせ',
                'Help': 'ヘルプ',
                'About Us': '私たちについて',

                // Inside ja.translation
                'Processing Options': '処理オプション',
                'Enable Debug Mode': 'デバッグモードを有効にする',
                'START MASKING': 'マスキングを開始',
                'Upload a file to start': 'ファイルをアップロードして開始',
                'Please upload a file before processing': '処理を始める前にファイルをアップロードしてください',

                // Common
                'An error occurred.': 'エラーが発生しました。',
                'Loading...': '読み込み中...',

                'Location': '場所',
                'Email': 'メール',
                'Age': '年齢',
                'Money': '金額',
                'Phone': '電話',
                'Time': '時間',
                'Facility': '施設',
                'Address': '住所',
                'Postal Address': '郵便住所',
                'Credit Card': 'クレジットカード',
                'URL': 'URL',
                'Organization': '組織',
                'Person': '人物',
                'Entity Configuration': 'エンティティ構成',


                'Masking Type': 'マスキングタイプ',
                'Substitute Character': '置換文字',
                'Enter substitute': '置換文字を入力してください',
                'Mask all characters': 'すべての文字をマスク',
                'Mask partially': '一部をマスク',
                'No masking': 'マスクしない',

                'File Upload': 'ファイルアップロード',
                'Drag and drop your file here, or click to browse': 'ここにファイルをドラッグ＆ドロップ、またはクリックして選択',
                'Supported formats': '対応形式',
                'You must be logged in.': 'ログインが必要です。',
                'Whitelist Configuration': 'ホワイトリスト設定',
                'Upload a whitelist file (.txt) to specify terms that should not be masked': 'マスキングされない単語を指定するホワイトリスト(.txt)ファイルをアップロードしてください',
                'Choose whitelist file': 'ホワイトリストファイルを選択',
                'Whitelist file loaded': '読み込まれたファイル',

                "Log out": "ログアウト",
                "Profile": "プロフィール",
                "Settings": "設定",
                "Premium Member": "プレミアム会員",
                "Logout successful!": "ログアウトに成功しました！",
                "You have been logged out successfully!": "正常にログアウトされました！",
                "An error occurred during logout. Please try again.": "ログアウト中にエラーが発生しました。もう一度お試しください。",

                "File Encryption": "ファイル暗号化",
                "Security API": "セキュリティAPI",
                "AI Monitoring": "AIモニタリング",

                "Company": "会社",
                "Careers": "採用情報",
                "Blog": "ブログ",

                "Support": "サポート",
                "Documentation": "ドキュメント",
                "System Status": "システム状況",

                // Sign Up Page
                'Sign Up': 'サインアップ',
                'Create Account': 'アカウントを作成',

                'Confirm Password': 'パスワードを確認',
                'Re-enter your password': 'パスワードを再入力してください',
                'Registering...': '登録中...',
                'I agree to the': '以下に同意します：',
                'Terms of Service': '利用規約',
                'Privacy Policy': 'プライバシーポリシー',
                'Please agree to the terms of service': '利用規約に同意してください',
                'Already have an account?': 'すでにアカウントをお持ちですか？',
                'Sign in now': '今すぐサインイン',


                "and": "と",
                "Copyright © 2018 - 2025 Aimesoft. All rights reserved.": "Copyright © 2018 - 2025 Aimesoft。無断転載を禁じます。",

                "Username is required": "ユーザー名は必須です",

    "Confirm password is required": "パスワードの確認は必須です",
    "Passwords do not match": "パスワードが一致しません",
    "Password must be at least 6 characters": "パスワードは6文字以上である必要があります",
    "Password must contain at least one uppercase letter": "パスワードには1つ以上の大文字を含めてください",
    "Password must contain at least one lowercase letter": "パスワードには1つ以上の小文字を含めてください",
    "Password must contain at least one number": "パスワードには1つ以上の数字を含めてください",
    "Password must contain at least one special character": "パスワードには1つ以上の特殊文字を含めてください",
    "Very Weak": "とても弱い",
    "Weak": "弱い",
    "Fair": "普通",
    "Strong": "強い",
    "Very Strong": "とても強い",
    "An error occurred during registration. Please try again.": "登録中にエラーが発生しました。もう一度お試しください。",
    "Registration failed. Please try again.": "登録に失敗しました。もう一度お試しください。",
    "Cannot connect to the server. Please check your network and try again.": "サーバーに接続できません。ネットワークを確認して再試行してください。",
    "An unknown error occurred. Please try again.": "不明なエラーが発生しました。もう一度お試しください。"



}
        },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('preferred-language') || 'en', // Default language
        fallbackLng: 'en',

        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
        },

        interpolation: {
            escapeValue: false, // React already escapes by default
        },

        react: {
            useSuspense: false,
        },
    });

export default i18n;