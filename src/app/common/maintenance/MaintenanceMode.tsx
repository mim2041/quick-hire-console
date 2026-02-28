import React, { useState, useEffect } from "react";
import { Button, Typography, Progress, Space, Divider } from "antd";
import {
  SettingOutlined,
  ReloadOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ToolOutlined,
  MailOutlined,
  RocketOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import type { MaintenanceConfig } from "../../../core/services/maintenanceService";
import { maintenanceService } from "../../../core/services/maintenanceService";

const { Title, Text } = Typography;

interface MaintenanceModeProps {
  config?: MaintenanceConfig;
}

const MaintenanceMode: React.FC<MaintenanceModeProps> = ({
  config = maintenanceService.getDefaultConfig(),
}) => {
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [progressPercent, setProgressPercent] = useState(65);

  // Countdown timer
  useEffect(() => {
    if (!config.showCountdown || !config.endTime) {
      return;
    }

    const updateCountdown = () => {
      const endTime = new Date(config.endTime!).getTime();
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference > 0) {
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeRemaining("");
        setProgressPercent(100);
        handleRefresh();
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [config.endTime, config.showCountdown]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const updatedConfig = await maintenanceService.getMaintenanceStatus();
      if (!updatedConfig.isEnabled) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to refresh maintenance status:", error);
    } finally {
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  const handleContactSupport = () => {
    if (config.contactEmail) {
      window.location.href = `mailto:${config.contactEmail}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231890ff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-lg w-full relative z-10">
        {/* Brand Header */}
        <div className="flex items-center justify-center mb-6 select-none">
          <img src="/logo.svg" alt="Data on Deck" className="h-8 w-8 mr-2" />
          <span className="text-gray-800 text-lg font-semibold tracking-tight">
            Data on Deck
          </span>
        </div>
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden maintenance-card">
          {/* Header with animated icon */}
          <div className="text-center pt-12 pb-8 px-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6 maintenance-icon">
              <SettingOutlined className="text-3xl text-primary rotating-icon" />
            </div>

            <Title level={2} className="text-gray-800 mb-3 font-semibold">
              {config.title || "Preparing for Launch"}
            </Title>

            <Text className="text-gray-600 text-base leading-relaxed">
              {config.message ||
                "We're preparing our MVP for launch. Data on Deck will be live soon — thanks for your patience."}
            </Text>
          </div>

          {/* Progress Section */}
          {config.showCountdown && (
            <div className="px-8 mb-8">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <ClockCircleOutlined className="text-primary text-lg mr-2" />
                    <Text className="text-gray-700 font-medium">
                      Maintenance Progress
                    </Text>
                  </div>
                  {timeRemaining && (
                    <Text className="text-primary font-semibold tabular-nums">
                      {timeRemaining}
                    </Text>
                  )}
                </div>

                <Progress
                  percent={progressPercent}
                  strokeColor="#1890ff"
                  strokeWidth={6}
                  showInfo={false}
                  className="mb-3"
                />

                <div className="flex justify-between text-xs text-gray-500">
                  <span>Started</span>
                  <span className="text-primary font-medium">In Progress</span>
                  <span>Complete</span>
                </div>
              </div>
            </div>
          )}

          {/* Status Steps */}
          <div className="px-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center text-sm">
                <CheckCircleOutlined className="text-green-500 text-base mr-3 flex-shrink-0" />
                <Text className="text-gray-700">
                  Core MVP features completed
                </Text>
              </div>
              <div className="flex items-center text-sm">
                <ToolOutlined className="text-primary text-base mr-3 flex-shrink-0 pulse-icon" />
                <Text className="text-gray-700">
                  Final QA and bug fixes in progress
                </Text>
              </div>
              <div className="flex items-center text-sm">
                <CodeOutlined className="text-gray-400 text-base mr-3 flex-shrink-0" />
                <Text className="text-gray-500">
                  UAT and performance testing pending
                </Text>
              </div>
              <div className="flex items-center text-sm">
                <RocketOutlined className="text-gray-400 text-base mr-3 flex-shrink-0" />
                <Text className="text-gray-500">
                  Production launch scheduled
                </Text>
              </div>
            </div>
          </div>

          <Divider className="my-0" />

          {/* Action Buttons */}
          <div className="p-8 bg-gray-50">
            <Space direction="vertical" className="w-full" size="middle">
              <Button
                type="primary"
                size="large"
                icon={<ReloadOutlined spin={isRefreshing} />}
                onClick={handleRefresh}
                loading={isRefreshing}
                className="w-full h-12 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200"
              >
                {isRefreshing ? "Checking..." : "Check Status"}
              </Button>

              {config.contactEmail && (
                <Button
                  size="large"
                  icon={<MailOutlined />}
                  onClick={handleContactSupport}
                  className="w-full h-12 rounded-lg font-medium border-gray-300 text-gray-700 hover:border-primary hover:text-primary transition-all duration-200"
                >
                  Contact Support
                </Button>
              )}
            </Space>

            {/* Footer note */}
            <div className="text-center mt-6 pt-4 border-t border-gray-200">
              <Text className="text-xs text-gray-500">
                We appreciate your patience • Estimated completion: {""}
                {config.estimatedDowntime || "Soon"}
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .maintenance-card {
            animation: slideUp 0.6s ease-out;
          }
          
          .maintenance-icon {
            animation: fadeInScale 0.8s ease-out;
          }
          
          .rotating-icon {
            animation: rotate 8s linear infinite;
          }
          
          .pulse-icon {
            animation: pulse 2s ease-in-out infinite;
          }
          
          @keyframes slideUp {
            from { 
              opacity: 0; 
              transform: translateY(30px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          
          @keyframes fadeInScale {
            from { 
              opacity: 0; 
              transform: scale(0.8); 
            }
            to { 
              opacity: 1; 
              transform: scale(1); 
            }
          }
          
          @keyframes rotate {
            from { 
              transform: rotate(0deg); 
            }
            to { 
              transform: rotate(360deg); 
            }
          }
          
          @keyframes pulse {
            0%, 100% { 
              opacity: 1; 
            }
            50% { 
              opacity: 0.5; 
            }
          }
          
          .tabular-nums {
            font-variant-numeric: tabular-nums;
          }
          `,
        }}
      />
    </div>
  );
};

export default MaintenanceMode;
