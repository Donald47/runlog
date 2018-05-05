FROM ruby:2.5.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /runlog
WORKDIR /runlog
COPY Gemfile /runlog/Gemfile
COPY Gemfile.lock /runlog/Gemfile.lock
RUN bundle install
COPY . /runlog
