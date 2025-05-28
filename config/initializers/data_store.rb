module DataStore
  class << self
    attr_reader :stock_list, :time_series_sample, :alpha_vantage_config

    def load_data!
      @stock_list = load_yaml("stock_list.yml", "dummy")
      @time_series_sample = load_yaml("time_series_sample.yml", "dummy")
      @alpha_vantage_config = load_yaml("alpha_vantage.yml", "app")
    end

    private

    def load_yaml(filename, folder)
      path = Rails.root.join("lib", "data", folder, filename)
      YAML.load_file(path) || {}
    rescue => e
      Rails.logger.error("[DataStore] Failed to load #{filename}: #{e.message}")
      {}
    end
  end
end

# Load data at app boot
DataStore.load_data!
