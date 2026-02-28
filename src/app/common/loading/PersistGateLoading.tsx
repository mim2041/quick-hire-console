const PersistGateLoading = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
      <p className="text-gray-600">Initializing application...</p>
    </div>
  </div>
);

export default PersistGateLoading;
