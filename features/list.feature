Feature: Geotrigger List
  In order to manage my application's geotriggers
  As an administrator
  I want to see a searchable and filterable list of all geotriggers

  Background:
    Given an application named "Editor Test"

  Scenario: empty list
    Given I am viewing the editor
    And my application has no geotriggers
    When I click the list button
    Then I see a message that says "No geotriggers yet"

  Scenario: populated list
    Given I am viewing the editor
    And I have some geotriggers
    When I click the list button
    Then I see all of my application's geotriggers

  Scenario: search by tag name
    Given I am viewing the editor
    And I have some geotriggers
    When I click the list button
    And I enter "tagname" in the search field
    Then I see a geotrigger with a tag of "tagname"

  Scenario: search by location
    Given I am viewing the editor
    And I have some geotriggers
    When I click the list button
    And I enter "442 SE 42nd" in the search field
    Then I see a geotrigger with a location containing "442 SE 42nd"
