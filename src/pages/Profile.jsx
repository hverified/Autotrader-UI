
import { useState } from "react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Shield,
    Bell,
    Lock,
    CreditCard,
    Settings,
    Edit2,
    Save,
    X,
    Key,
    Sparkles
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: "Mohd Khalid Siddiqui",
        email: "siddiquikhalid10@gmail.com",
        phone: "+91 98765 43210",
        location: "Bangalore, Karnataka",
        tradingExperience: "5 years"
    });

    const [editedData, setEditedData] = useState(userData);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedData(userData);
    };

    const handleSave = () => {
        setUserData(editedData);
        setIsEditing(false);
        toast.success("Profile updated successfully!");
    };

    const handleCancel = () => {
        setEditedData(userData);
        setIsEditing(false);
    };

    const accountStats = [
        { label: "Account Status", value: "Active", color: "text-green-600", bg: "bg-green-50" },
        { label: "Member Since", value: "Jan 2023", color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Total Trades", value: "342", color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Success Rate", value: "68%", color: "text-amber-600", bg: "bg-amber-50" },
    ];

    const settingsSections = [
        { icon: Bell, title: "Notifications", description: "Manage alerts and notifications", color: "text-blue-600", bg: "bg-blue-50" },
        { icon: Shield, title: "Security", description: "Two-factor authentication", color: "text-green-600", bg: "bg-green-50" },
        { icon: CreditCard, title: "Billing", description: "Payment methods and invoices", color: "text-purple-600", bg: "bg-purple-50" },
        { icon: Key, title: "API Keys", description: "Manage your API credentials", color: "text-amber-600", bg: "bg-amber-50" },
    ];

    return (
        <div className="pb-16 sm:pb-0 p-4 sm:p-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 min-h-screen">
            <Toaster position="top-right" />

            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/30">
                            <User size={28} className="text-white" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
                            My Profile
                        </h1>
                    </div>
                    <p className="text-sm sm:text-base text-slate-600 flex items-center gap-2 ml-1">
                        <Sparkles size={16} className="text-amber-500" />
                        Manage your account and preferences
                    </p>
                </div>

                {/* Account Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    {accountStats.map((stat, index) => (
                        <div key={index} className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/60 p-4">
                            <p className="text-xs font-medium text-slate-500 mb-1">{stat.label}</p>
                            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Profile Card */}
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/60 p-6 sm:p-8 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                                <User size={32} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">{userData.name}</h2>
                                <p className="text-slate-500">{userData.occupation}</p>
                            </div>
                        </div>
                        {!isEditing ? (
                            <button
                                onClick={handleEdit}
                                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
                            >
                                <Edit2 size={16} />
                                Edit
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2 font-medium"
                                >
                                    <Save size={16} />
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors flex items-center gap-2 font-medium"
                                >
                                    <X size={16} />
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                                <Mail size={16} />
                                Email
                            </label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    value={editedData.email}
                                    onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            ) : (
                                <p className="text-slate-900 px-4 py-2 bg-slate-50 rounded-xl">{userData.email}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                                <Phone size={16} />
                                Phone
                            </label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    value={editedData.phone}
                                    onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            ) : (
                                <p className="text-slate-900 px-4 py-2 bg-slate-50 rounded-xl">{userData.phone}</p>
                            )}
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                                <MapPin size={16} />
                                Location
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedData.location}
                                    onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            ) : (
                                <p className="text-slate-900 px-4 py-2 bg-slate-50 rounded-xl">{userData.location}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Settings Sections */}
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/60 p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Settings size={24} />
                        Settings & Preferences
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {settingsSections.map((section, index) => (
                            <button
                                key={index}
                                className="flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors text-left"
                            >
                                <div className={`p-3 rounded-xl ${section.bg}`}>
                                    <section.icon size={24} className={section.color} />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900">{section.title}</p>
                                    <p className="text-sm text-slate-500">{section.description}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
