// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import {
    User,
    Mail,
    Phone,
    Edit2,
    Save,
    X,
    Sparkles,
    Key,
    Building2,
    Lock
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { updateUserProfile, changePassword } from "../api/users";

export default function Profile() {
    const { user, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);

    const [editedData, setEditedData] = useState({
        full_name: "",
        phone_number: "",
        broker_name: "",
        broker_api_key: "",
        broker_api_secret: ""
    });

    const [passwordData, setPasswordData] = useState({
        old_password: "",
        new_password: "",
        confirm_password: ""
    });

    useEffect(() => {
        if (user) {
            setEditedData({
                full_name: user.full_name || "",
                phone_number: user.phone_number || "",
                broker_name: user.broker_name || "",
                broker_api_key: user.broker_api_key || "",
                broker_api_secret: ""
            });
        }
    }, [user]);

    const handleEdit = () => setIsEditing(true);

    const handleSave = async () => {
        try {
            await updateUserProfile(editedData);
            await updateUser(editedData);
            setIsEditing(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error(error.response?.data?.detail || "Failed to update profile");
        }
    };

    const handleCancel = () => {
        if (user) {
            setEditedData({
                full_name: user.full_name || "",
                phone_number: user.phone_number || "",
                broker_name: user.broker_name || "",
                broker_api_key: user.broker_api_key || "",
                broker_api_secret: ""
            });
        }
        setIsEditing(false);
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (passwordData.new_password !== passwordData.confirm_password) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await changePassword({
                old_password: passwordData.old_password,
                new_password: passwordData.new_password
            });

            toast.success("Password changed successfully!");
            setChangingPassword(false);
            setPasswordData({ old_password: "", new_password: "", confirm_password: "" });
        } catch (error) {
            toast.error(error.response?.data?.detail || "Failed to change password");
        }
    };

    const accountStats = [
        {
            label: "Account Status",
            value: user?.is_active ? "Active" : "Inactive",
            color: user?.is_active ? "text-green-600" : "text-red-600",
            bg: user?.is_active ? "bg-green-50" : "bg-red-50"
        },
        {
            label: "Member Since",
            value: user?.created_at
                ? new Date(user.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric"
                })
                : "N/A",
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            label: "Trading Status",
            value: user?.trading_enabled ? "Enabled" : "Disabled",
            color: user?.trading_enabled ? "text-green-600" : "text-amber-600",
            bg: user?.trading_enabled ? "bg-green-50" : "bg-amber-50"
        },
        {
            label: "Role",
            value: user?.role
                ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                : "User",
            color: "text-purple-600",
            bg: "bg-purple-50"
        }
    ];

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

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
                        <div
                            key={index}
                            className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/60 p-4"
                        >
                            <p className="text-xs font-medium text-slate-500 mb-1">
                                {stat.label}
                            </p>
                            <p className={`text-xl font-bold ${stat.color}`}>
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Profile Card */}
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/60 p-6 sm:p-8 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3 sm:gap-0">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                                <User size={32} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">
                                    {user.full_name || user.username}
                                </h2>
                                <p className="text-slate-600">@{user.username}</p>
                            </div>
                        </div>
                        {!isEditing ? (
                            <button
                                onClick={handleEdit}
                                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
                            >
                                <Edit2 size={16} />
                                Edit
                            </button>
                        ) : (
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                                <button
                                    onClick={handleSave}
                                    className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium"
                                >
                                    <Save size={16} />
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="w-full sm:w-auto px-4 py-2 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors flex items-center justify-center gap-2 font-medium"
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
                            <p className="text-slate-900 px-4 py-2 bg-slate-50 rounded-xl">
                                {user.email}
                            </p>
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
                                    value={editedData.phone_number}
                                    onChange={(e) =>
                                        setEditedData({
                                            ...editedData,
                                            phone_number: e.target.value
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="+91 98765 43210"
                                />
                            ) : (
                                <p className="text-slate-900 px-4 py-2 bg-slate-50 rounded-xl">
                                    {user.phone_number || "Not set"}
                                </p>
                            )}
                        </div>

                        {/* Full Name */}
                        <div className="space-y-2 sm:col-span-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                                <User size={16} />
                                Full Name
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedData.full_name}
                                    onChange={(e) =>
                                        setEditedData({
                                            ...editedData,
                                            full_name: e.target.value
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Your full name"
                                />
                            ) : (
                                <p className="text-slate-900 px-4 py-2 bg-slate-50 rounded-xl">
                                    {user.full_name || "Not set"}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Broker Configuration */}
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/60 p-6 sm:p-8 mb-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                            <Building2 size={24} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">
                            Broker Configuration
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Broker Name */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                                <Building2 size={16} />
                                Broker Name
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedData.broker_name}
                                    onChange={(e) =>
                                        setEditedData({
                                            ...editedData,
                                            broker_name: e.target.value
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., Zerodha, Upstox"
                                />
                            ) : (
                                <p className="text-slate-900 px-4 py-2 bg-slate-50 rounded-xl">
                                    {user.broker_name || "Not configured"}
                                </p>
                            )}
                        </div>

                        {/* API Key */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                                <Key size={16} />
                                API Key
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedData.broker_api_key}
                                    onChange={(e) =>
                                        setEditedData({
                                            ...editedData,
                                            broker_api_key: e.target.value
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Your broker API key"
                                />
                            ) : (
                                <p className="text-slate-900 px-4 py-2 bg-slate-50 rounded-xl">
                                    {user.broker_api_key ? "••••••••" : "Not set"}
                                </p>
                            )}
                        </div>

                        {/* API Secret */}
                        {isEditing && (
                            <div className="space-y-2 sm:col-span-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                                    <Key size={16} />
                                    API Secret
                                </label>
                                <input
                                    type="password"
                                    value={editedData.broker_api_secret}
                                    onChange={(e) =>
                                        setEditedData({
                                            ...editedData,
                                            broker_api_secret: e.target.value
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Your broker API secret"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Security */}
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/60 p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3 sm:gap-0">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
                                <Key size={24} className="text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                Security
                            </h2>
                        </div>
                        {!changingPassword && (
                            <button
                                onClick={() => setChangingPassword(true)}
                                className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2 font-medium"
                            >
                                <Key size={16} />
                                Change Password
                            </button>
                        )}
                    </div>

                    {changingPassword && (
                        <form onSubmit={handlePasswordSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                                    <Lock size={16} />
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.old_password}
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            old_password: e.target.value
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter current password"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                                    <Lock size={16} />
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.new_password}
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            new_password: e.target.value
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter new password"
                                    minLength={8}
                                    maxLength={72}
                                    required
                                />
                                <p className="text-xs text-slate-500">
                                    8-72 chars, 1 uppercase, 1 digit
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                                    <Lock size={16} />
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.confirm_password}
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            confirm_password: e.target.value
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Confirm new password"
                                    required
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium"
                                >
                                    <Save size={16} />
                                    Update Password
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setChangingPassword(false);
                                        setPasswordData({
                                            old_password: "",
                                            new_password: "",
                                            confirm_password: ""
                                        });
                                    }}
                                    className="w-full sm:w-auto px-6 py-2 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors flex items-center justify-center gap-2 font-medium"
                                >
                                    <X size={16} />
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
