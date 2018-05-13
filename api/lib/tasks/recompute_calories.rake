task :recompute_calories => :environment do
  Run.all.map { |run| run.compute_calories  }
end
